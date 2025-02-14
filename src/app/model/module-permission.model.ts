export interface ModulePermissions {
    [key: string]: boolean;
}

export interface ModuleAccess {
    moduleName: string;
    // moduleCode:string;  // Add this in future for better control
    permissions: ModulePermissions;
}