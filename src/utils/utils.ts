import { unlinkSync } from 'fs';

const pagination = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

const removeKeyUndefined = (data: any) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  return data;
};

const removeFile = (filename: string) => {
  try {
    const fileSplit = filename.split('/');
    unlinkSync(`./public/${fileSplit[fileSplit.length - 1]}`);
    console.log(`successfully deleted /public/${filename}`);
  } catch (err: any) {
    console.log(err.message);
  }
};

export { pagination, removeKeyUndefined, removeFile };
