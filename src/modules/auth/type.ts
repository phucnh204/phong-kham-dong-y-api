export interface JwtUserPayload {
  username: string;
  id: number;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtUserPayload;
}
