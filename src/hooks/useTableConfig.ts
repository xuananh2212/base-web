import { TableColumn } from "@/app/(private)/components/table-base";
import { LOCALE_STORAGE_KEYS } from "@/helpers/common.constant";
import SettingService from "@/services/setting";
import CONFIG_QUERY_KEY_ENUM from "@/services/setting/keys";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useTableConfig = (name: string, onChangeColumns: React.Dispatch<React.SetStateAction<Array<TableColumn>>>) => {
  const { data } = useQuery({
    queryKey: [CONFIG_QUERY_KEY_ENUM.TABLE_CONFIG],
    queryFn: async () => {
      const response = await SettingService.getTableConfig();
      if (response.data) {
        const data = response.data.result?.map((e) => ({ ...e, config: JSON.parse(e.data_config) }));
        localStorage.setItem(LOCALE_STORAGE_KEYS.TABLE_CONFIG, JSON.stringify(data));
        return data;
      }
      return null;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    placeholderData: () => {
      const cachedData = localStorage.getItem(LOCALE_STORAGE_KEYS.TABLE_CONFIG);
      try {
        return cachedData ? JSON.parse(cachedData) : undefined;
      } catch (e) {}
      return null;
    },
  });

  const currentSetting = data?.find((e) => e.code === name);

  useEffect(() => {
    const currentSetting = data?.find((e) => e.code === name);
    if (currentSetting) {
      try {
        onChangeColumns((prev) => {
          prev.forEach((col) => {
            const settingColumn = currentSetting.config.find((e: any) => e.key === col.key);
            if (settingColumn) {
              col.hidden = settingColumn.hidden;
            }
          });
          return [...prev];
        });
      } catch (e) {}
    }
  }, [data]);

  return { config: currentSetting?.config };
};

export default useTableConfig;
