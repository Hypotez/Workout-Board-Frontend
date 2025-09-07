import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SettingsPopup() {

  const clickSettings = () => {
    console.log("inside here")
  }

  return (
    <Button variant="outline" size="icon" onClick={clickSettings} className="cursor-pointer hover:cursor-pointer" >
      <Settings />
    </Button>
  )
}