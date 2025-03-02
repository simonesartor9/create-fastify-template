import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Validate,
} from "sequelize-typescript";
import Role from "./role";
import Constants from "../config/constants";

@Table({
    timestamps: true,
    tableName: "t_users",
})
export default class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    number: number;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    name: string;

    @AllowNull(false)
    @Validate({
        isEmail: true,
    })
    @Column(DataType.STRING(50))
    email: string;

    @Validate({
        is: /^[0-9]{10,20}$/,
    })
    @Column(DataType.STRING(20))
    phone: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    password?: string;

    @Column(DataType.DATE)
    recoveryNumberDate: Date;

    @Column(DataType.STRING(10))
    recoveryNumber?: string;

    @Column(DataType.TEXT)
    refreshToken: string;

    @ForeignKey(() => Role)
    @Column(DataType.UUID)
    roleId: string;

    @Validate({
        isIn: [[Constants.STATUS_DELETED, Constants.STATUS_ACTIVE]],
    })
    @AllowNull(false)
    @Default('active')
    @Column(DataType.STRING(40))
    status: string;

    @BelongsTo(() => Role, "roleId")
    userGroup: Role;
}
