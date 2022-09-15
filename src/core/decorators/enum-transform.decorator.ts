import { Transform } from 'class-transformer';

export const EnumTransform = (entity: unknown) =>
  Transform((value) => {
    if (Object.values(entity).indexOf(value.value) > -1) {
      return value.value;
    }

    if (entity.hasOwnProperty(value.value)) {
      return entity[value.value];
    }
  });
