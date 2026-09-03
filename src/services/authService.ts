import axiosInstance from '../configs/axiosInstance'
import { API_ROUTES } from '../configs/config'

export interface UserData {
  _id: string
  email: string
  role?: string
  status?: string
  avatar?: string | null
  profile?: {
    firstName?: string
    lastName?: string
  }
  firstName?: string
  lastName?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token: string
  user: UserData
}

export interface LoginParams {
  email: string
  password?: string
}

export interface RegisterParams {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password?: string
}

/**
 * Register a new user
 */
export const registerUser = async (params: RegisterParams): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(API_ROUTES.register, params)
  return response.data
}

/**
 * Log in an existing user
 */
export const loginUser = async (params: LoginParams): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(API_ROUTES.login, params)
  return response.data
}
