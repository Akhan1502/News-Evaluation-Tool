declare namespace chrome {
  export interface Permissions {
    request(permissions: {
      origins?: string[];
      permissions?: string[];
    }): Promise<boolean>;
    contains(permissions: {
      origins?: string[];
      permissions?: string[];
    }): Promise<boolean>;
    remove(permissions: {
      origins?: string[];
      permissions?: string[];
    }): Promise<boolean>;
  }

  export const permissions: Permissions;
}

declare namespace browser {
  export interface Permissions {
    request(permissions: {
      origins?: string[];
      permissions?: string[];
    }): Promise<boolean>;
    contains(permissions: {
      origins?: string[];
      permissions?: string[];
    }): Promise<boolean>;
    remove(permissions: {
      origins?: string[];
      permissions?: string[];
    }): Promise<boolean>;
  }

  export const permissions: Permissions;
}