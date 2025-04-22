
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Activity {
  id: string;
  action: string;
  partner: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: "1",
    action: "Completed supply chain disclosure form",
    partner: {
      name: "Eco Solutions Inc.",
      initials: "ES",
    },
    timestamp: "15 minutes ago",
  },
  {
    id: "2",
    action: "Uploaded updated compliance certificates",
    partner: {
      name: "Global Textiles",
      initials: "GT",
    },
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    action: "Acknowledged remediation plan",
    partner: {
      name: "Sustainable Packaging Co.",
      initials: "SP",
    },
    timestamp: "5 hours ago",
  },
  {
    id: "4",
    action: "Started onboarding process",
    partner: {
      name: "Clean Energy Partners",
      initials: "CE",
    },
    timestamp: "1 day ago",
  },
];

export const PartnerActivity = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">Recent Partner Activity</CardTitle>
        <Calendar className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.partner.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.partner.initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.partner.name}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
