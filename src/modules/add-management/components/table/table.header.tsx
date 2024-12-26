import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useAddManagementModals } from "../../store";

export const AddManagementHeader = () => {
  const { setModal } = useAddManagementModals();
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-[600]">E'lonlar</span>
        <Button
          color="success"
          onPress={() => {
            setModal({ create: { open: true, props: null } });
          }}
        >
          E'lon qo'shish
        </Button>
      </div>
      <Divider />
    </>
  );
};
