import * as yup from 'yup'

export const userSchema = yup.object().shape({
    name: yup.string()
        .required("First name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot be longer than 50 characters"),
    email: yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup.string()
        .min(5, "Password must be at least 5 characters")
        .max(50, "Password must be at most 50 characters")
        .test('min-lowercase', 'Password must contain at least 1 lower case letter', (value) => /[a-z]/.test(value))
        .test('min-uppercase', 'Password must contain at least 1 upper case letter', (value) => /[A-Z]/.test(value))
        .test('min-number', 'Password must contain at least 1 number', (value) => /[0-9]/.test(value))
        .test('min-symbol', 'Password must contain at least 1 special character', (value) => /[^A-Za-z0-9]/.test(value))
        .required("Password is required"),
    verifyPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Passwords must match")
})
