import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import useDeleteModalStore from "../../../store/DeleteModalStore";
import { Cube } from "../../../types/CubeTypes";
import api from "../../../http/base_api";
import { AxiosError, isAxiosError } from "axios";
import { Flip, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ cube }: { cube: Cube }) => {
    const { isOpen, setIsOpen } = useDeleteModalStore();
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const deleteTheCube = async () => {
        try {
            setDeleteLoading(true);
            await api.delete(`cube/specific/${cube.id}`);
            setIsOpen(false);
            navigate("/cubes");
        } catch (e) {
            const error = e as Error | AxiosError;
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message, {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
            }
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{`Deleting the ${cube.name}`}</ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure you want to delete the cube? This action is irreversible, and the cube will
                                be permanently removed.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>
                                Close
                            </Button>
                            <Button
                                color="danger"
                                variant="bordered"
                                onPress={onClose}
                                isLoading={deleteLoading}
                                onClick={deleteTheCube}
                            >
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteModal;
