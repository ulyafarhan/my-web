import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, placeholder, isLoading }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl gap-2">
      <Input
        name="q"
        placeholder={placeholder || "Cari proyek atau teknologi..."}
        autoComplete="off"
      />
      <Button type="submit" isLoading={isLoading}>
        Cari
      </Button>
    </form>
  );
};