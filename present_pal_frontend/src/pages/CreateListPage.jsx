import { useNavigate } from "react-router-dom";
import CreateListForm from "../components/CreateListForm";

const CreateListPage = () => {

    const navigate = useNavigate();
    const token = window.localStorage.getItem("token");

    // Redirect to login if user is not authenticated
    if (!token) {
        navigate("/login");
        return null;
    }
    return (
        <div>
            <CreateListForm />
        </div>
    );

    
}

export default CreateListPage; 