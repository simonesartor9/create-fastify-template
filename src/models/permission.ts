import {Column, DataType, Default, Model, PrimaryKey, Table, Validate,} from "sequelize-typescript";
import Constants from "../config/constants";

@Table({
    timestamps: true,
    tableName: "t_permissions",
})
export default class Permission extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Validate({
        isIn: [[Constants.STATUS_DELETED, Constants.STATUS_ACTIVE]],
    })
    @Default('active')
    @Column(DataType.STRING(40))
    status: string;
}
