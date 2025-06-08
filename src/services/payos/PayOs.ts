import { axiosInstance } from "@/configs/axios.config";
import { endPointApi } from "@/helpers/endPointApi";
const { PAYOS } = endPointApi;
export class PayOsService {
  static createPaymentLink(data: any) {
    return axiosInstance.post(`/${PAYOS}/create`, data);
  }
}

export default PayOsService;
