const pageNaNError = {
  err: {
    code: 'invalid_data',
    message: '"page" is a required field and must be a number',
  },
};

const pageIsNotIntergerError = {
  err: {
    code: 'invalid_data',
    message: '"page" must be a value greater than 0',
  },
};

const contentNotFoundError = {
  err: {
    code: 'not_found',
    message: 'Content not found',
  },
};

const heroNameSearchError = {
  err: {
    code: 'invalid_data',
    message: '"name" is a required field and must be at least 3 characters long',
  },
};

const arrayOfIdsError = {
  err: {
    code: 'invalid_data',
    message: '"arrayList" is a required param and must be an array',
  },
};

module.exports = {
  pageNaNError,
  pageIsNotIntergerError,
  contentNotFoundError,
  heroNameSearchError,
  arrayOfIdsError,
};
