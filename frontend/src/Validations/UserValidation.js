import * as yup from 'yup'

export const userSchema = yup.object().shape({
    name: yup.string()
        .required("first name is required")
        .min(2, "name must be at least 2 characters")
        .max(15, "name cannot be longer than 15 characters"),
    email: yup.string()
        .email("please enter a valid email")
        .required("email is required"),
    password: yup.string()
        .min(5, "password must be at least 5 characters")
        .max(10, "password must be at most 10 characters")
        .test('min-lowercase', 'password must contain at least 1 lower case letter', (value) => /[a-z]/.test(value))
        .test('min-uppercase', 'password must contain at least 1 upper case letter', (value) => /[A-Z]/.test(value))
        .test('min-number', 'password must contain at least 1 number', (value) => /[0-9]/.test(value))
        .test('min-symbol', 'password must contain at least 1 special character', (value) => /[^A-Za-z0-9]/.test(value))
        .required("password is required"),
    verifyPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required")
})
