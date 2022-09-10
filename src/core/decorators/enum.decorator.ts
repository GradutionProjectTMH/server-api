import { Transform } from 'class-transformer';

export const EnumTransform = (entity: unknown) =>
  Transform((value) => {
    console.log(value.type);
    console.log(entity);

    if (Array.isArray(value.value)) {
      return value.value.map((item) => {
        console.log(value.type);
        console.log(item);
        console.log(entity);

        // return getEnumValue(value.type, item, entity);
      });
    }
    // return getEnumValue(value.type, value.value, entity);
  });
