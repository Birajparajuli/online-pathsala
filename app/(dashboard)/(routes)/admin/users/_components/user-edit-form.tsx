import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Select } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const FormSchema = z.object({
  role: z.enum(["TEACHER", "ADMIN", "USER"]),
});
const UserEditForm = ({ id, role }: { id: string; role: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const userID = id;
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch(`/api/user/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: data.role }),
      });

      if (response.ok) {
        toast.success("User updated successfully");
        window.location.reload();
      } else {
        toast.error("User not updated");
      }
      // Optionally, you can re-fetch the data to update the table
    } catch (error) {
      console.error(error);
      toast.error(`User not updated | ${error || "undefined"}`);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={role}
                      defaultValue={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="TEACHER">TEACHER</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
};
export default UserEditForm;
