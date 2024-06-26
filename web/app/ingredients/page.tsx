"use client";
import { SearchRoot } from "@/components/ingredient/SearchRoot";
import { ReceiptUpload } from "@/components/receipt/ReceiptUpload";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function IngredientsPage() {
  const [search, setSearch] = useState<string>();

  return (
    <div>
      <h1 className="text-5xl font-black">Ingredients</h1>
      <div className="flex items-center py-8">
        <InputWithIcon
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-80"
          startIcon={Search}
        />
        <div className="flex gap-2">
          <Link href="/ingredients/create">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add ingredient
            </Button>
          </Link>

          <ReceiptUpload />
        </div>
      </div>
      <ScrollArea className="h-[800px]">
        <div className="grid grid-cols-auto-fill-5 gap-8">
          <SearchRoot />
        </div>
        <Loader2 className="animate-spin" />
      </ScrollArea>
    </div>
  );
}
