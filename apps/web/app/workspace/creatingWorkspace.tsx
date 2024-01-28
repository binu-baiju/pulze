import { Button } from "ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Workspace</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Name your workspace</DialogTitle>
          <DialogDescription>
            A workspace is shared home for you andyour coworkers to collaborate
            on pulze
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              placeholder="Workspace name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="bg-indigo-600">
            <Button type="submit">Create Workspace</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
