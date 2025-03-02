import {BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table, Validate,} from "sequelize-typescript";
import RolePermission from "./rolePermission";
import Permission from "./permission";
import Constants from "../config/constants";

@Table({
    timestamps: true,
    tableName: "t_roles",
})
export default class Role extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column(DataType.STRING(40))
    name: string;

    @Validate({
        isIn: [[Constants.STATUS_ACTIVE, Constants.STATUS_DELETED]],
    })
    @Default('active')
    @Column(DataType.STRING(40))
    status: string;

    @BelongsToMany(() => Permission, () => RolePermission)
    userGroupPermissions: Permission[]
}
