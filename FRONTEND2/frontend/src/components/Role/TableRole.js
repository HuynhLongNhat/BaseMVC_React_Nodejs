import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
    fetchAllRoles,
    deleteRole
} from "../../service/RoleService"
import { toast } from "react-toastify";
const TableRole = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([])

    useEffect(() => {
        getAllRole()
    }, [])

    useImperativeHandle(ref, () => ({
        fetchListRolesAgain() {
            getAllRole()
        }
    }))
    const getAllRole = async () => {
        let data = await fetchAllRoles();

        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }

    }
    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role)
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            await getAllRole()
        }
    }
    return (<>

        <table className="table table-bordered table-hover">
            <thead>
                <tr>

                    <th scope="col">Id</th>
                    <th scope="col">Email</th>
                    <th scope="col">Group</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listRoles && listRoles.length > 0 ? (
                    <>
                        {listRoles.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>

                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>

                                    <td>

                                        <span
                                            title="Delete"
                                            className="delete"
                                            onClick={() => handleDeleteRole(item)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </>
                ) : (
                    <>
                        <tr>
                            <td colSpan={4}>Not found Role!</td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    </>);
})

export default TableRole;