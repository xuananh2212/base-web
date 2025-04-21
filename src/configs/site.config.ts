import _ from "lodash";

const meta = {
  title: "X",
  description: "The descriptions.",
};

export default function getMetadata(title?: string) {
  const data = _.cloneDeep(meta);
  if (title) {
    data.title = title + " | " + meta.title;
  }
  return data;
}
