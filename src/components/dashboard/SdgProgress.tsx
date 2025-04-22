
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SdgData {
  id: number;
  name: string;
  target: number;
  current: number;
  color: string;
}

const sdgData: SdgData[] = [
  { 
    id: 8, 
    name: "Decent Work", 
    target: 100, 
    current: 78, 
    color: "#8A1A32" 
  },
  { 
    id: 12, 
    name: "Responsible Consumption", 
    target: 100, 
    current: 65, 
    color: "#BF8B2E" 
  },
  { 
    id: 16, 
    name: "Justice & Institutions", 
    target: 100, 
    current: 82, 
    color: "#00689D" 
  },
];

export const SdgProgress = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">SDG Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sdgData.map((sdg) => (
            <div key={sdg.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div 
                    className="h-6 w-6 rounded-md flex items-center justify-center text-white text-xs font-semibold"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.id}
                  </div>
                  <span className="text-sm font-medium">{sdg.name}</span>
                </div>
                <span className="text-sm font-semibold">
                  {sdg.current}%
                </span>
              </div>
              <Progress value={sdg.current} max={sdg.target} className="h-2" indicatorClassName={`bg-[${sdg.color}]`} />
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/sdg-dashboard" className="text-sm text-primary hover:underline">
            View full SDG dashboard
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
