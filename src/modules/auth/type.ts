export interface JwtUserPayload {
  username: string;
  id: number;
}

export interface AuthenticatedRequest extends Request {
  user: JwtUserPayload;
}
