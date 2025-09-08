import { Settings, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function SettingsPopup() {
  const [apiKey, setApiKey] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('hevy-api-key', apiKey)
      setIsOpen(false)
    }
  }

  useState(() => {
    const savedKey = localStorage.getItem('hevy-api-key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  })

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer hover:cursor-pointer">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-4">
        <DropdownMenuLabel className="text-lg font-semibold p-0 mb-3">
          Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-3" />
        
        <div className="flex items-center gap-2 mb-3">
          <Label htmlFor="api-key">
            Hevy API Key
          </Label>
        </div>
        
        <div className="space-y-3">
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your Hevy API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
          
          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={!apiKey.trim()}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>

        <div className="text-xs text-muted-foreground mt-3">
          Add Hevy API key to sync with your real workout data.
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}