/**
 * The representation of the user entity.
 */
export default interface UserDTO {
  id: number
  username: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}
