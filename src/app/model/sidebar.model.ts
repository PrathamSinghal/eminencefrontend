export class Sidebar {
    name!: String;
    path!: String;
    icon!: String;
    isAllowed!: boolean;
    code!: String;
    child: Array<Sidebar> = []
}