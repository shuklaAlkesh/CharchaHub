import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <div
            className="
            fixed
            inset-0
            flex
            justify-center
            items-center
            bg-white
        "
        >
            <PuffLoader size={100} color="MediumSlateBlue" />
        </div>
    );
};

export default Loader;