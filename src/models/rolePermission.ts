import {Column, DataType, ForeignKey, Model, Table,} from "sequelize-typescript";
import Role from "./role";
import Permission from "./permission";

@Table({
    timestamps: true,
    tableName: "t_roles_permissions",
})
export default class RolePermission extends Model {
    @ForeignKey(() => Role)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    userGroupId: string;

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    permissionId: string;

}
