type LoginHistory = {
  ip: string;
  timestamp: Date;
  deviceInfo: string;
  userAgent: string;
  location: string;
  deviceType: string;
  os: string;
  browser: string;
};

type User = {
  readonly uid: string;
  displayName: string;
  email: string;
  photoUrl: string | null;
  readonly createdAt: Date;
  updatedAt: Date;

  // Auth & Security
  provider: "google" | "outlook" | "apple";
  isVerified: boolean;
  lastLoginAt: Date;
  loginCount: number;
  roles: string[];

  // Account Management
  status: "active" | "inactive" | "banned";
  loginHistory: LoginHistory[];

  // Customization & Product Features
  settings?: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  subscription?: {
    plan: "free" | "pro" | "enterprise";
    expiresAt: Date | null;
  };
};

export type { User, LoginHistory };