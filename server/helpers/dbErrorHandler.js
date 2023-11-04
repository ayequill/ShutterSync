/* DB Error Handling */

const getErrorMessage = (error) => {
  let message = '';
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(error);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (const errName in error.errors) {
      if (error.errors[errName].message)
        message = error.errors[errName].message;
    }
  }
  return message;
};

export default { getErrorMessage };

const getUniqueErrorMessage = (error) => {
  let output;
  try {
    const fieldName = error.message.substring(
      error.message.lastIndexOf('.$') + 2,
      error.message.lastIndexOf('_1')
    );
    output = `${
      fieldName.charAt(0).toLocaleLowerCase() + fieldName.slice(1)
    } already exists`;
  } catch (e) {
    output = 'Unique field already exists';
  }
  return output;
};
