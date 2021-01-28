import asyncHandler from 'express-async-handler'

const getData = asyncHandler(async (req, res) => {
  res.json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Chukwuebuka Ibeh',
      github: '@emysly12',
      email: 'ebukasly123@gmail.com',
      mobile: '07060694614',
      twitter: '@emysilva1234',
    },
  })
})

const validateData = asyncHandler(async (req, res) => {
  const { rule, data } = req.body

  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    })
  }

  if (!rule) {
    return res.status(400).json({
      message: 'rule is required.',
      status: 'error',
      data: null,
    })
  }

  if (!data) {
    return res.status(400).json({
      message: 'data is required.',
      status: 'error',
      data: null,
    })
  }

  if (!rule.field) {
    return res.status(400).json({
      message: 'field field is missing from data.',
      status: 'error',
      data: null,
    })
  }

  if (!rule.condition) {
    return res.status(400).json({
      message: 'field condition is missing from data.',
      status: 'error',
      data: null,
    })
  }

  if (!rule.condition_value) {
    return res.status(400).json({
      message: 'field condition_value is missing from data.',
      status: 'error',
      data: null,
    })
  }

  if (Array.isArray(data) || typeof data === 'string') {
    if (data[rule.field] !== undefined) {
      if (data[rule.field] !== rule.condition_value) {
        res.status(400).json({
          message: `field ${rule.field} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data[rule.field],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        })
      } else {
        console.log(data[5])
        res.status(200).json({
          message: `field ${rule.field} successfully validated.`,
          status: 'success',
          data: {
            validation: {
              error: false,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        })
      }
    } else {
      res.status(400).json({
        message: `field ${rule.field} is missing from data.`,
        status: 'error',
        data: null,
      })
    }
  }

  if (data.missions >= rule.condition_value) {
    res.status(200).json({
      message: 'field missions successfully validated.',
      status: 'success',
      data: {
        validation: {
          error: false,
          field: rule.field,
          field_value: data.missions,
          condition: rule.condition,
          condition_value: rule.condition_value,
        },
      },
    })
  } else {
    res.status(400).json({
      message: `field ${rule.field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field: rule.field,
          field_value: data.missions,
          condition: rule.condition,
          condition_value: rule.condition_value,
        },
      },
    })
  }

  if (typeof rule != 'object') {
    console.log(req.headers['content-type'])
    return res.status(400).json({
      message: 'rule should be a|an object.',
      status: 'error',
      data: null,
    })
  }
})

export { getData, validateData }
