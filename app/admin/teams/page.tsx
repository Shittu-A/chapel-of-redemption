"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, X, Users } from "lucide-react";

interface Team {
  id: string;
  name: string;
  slug: string;
  description: string;
  responsibilities: string[];
  created_at: string;
}

interface TeamMember {
  id: string;
  team_id: string;
  name: string;
  role: string;
  photo_url?: string;
  order_index: number;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [members, setMembers] = useState<Record<string, TeamMember[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const supabase = createClient();

  const [teamForm, setTeamForm] = useState({
    name: "",
    slug: "",
    description: "",
    responsibilities: [""],
  });

  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "",
    photo_url: "",
  });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    setIsLoading(true);
    const { data: teamsData } = await supabase.from("teams").select("*").order("created_at");
    
    if (teamsData) {
      setTeams(teamsData);
      
      // Load members for each team
      const membersMap: Record<string, TeamMember[]> = {};
      for (const team of teamsData) {
        const { data: membersData } = await supabase
          .from("team_members")
          .select("*")
          .eq("team_id", team.id)
          .order("order_index");
        membersMap[team.id] = membersData || [];
      }
      setMembers(membersMap);
    }
    
    setIsLoading(false);
  };

  const handleSaveTeam = async () => {
    const payload = {
      name: teamForm.name,
      slug: teamForm.slug,
      description: teamForm.description,
      responsibilities: teamForm.responsibilities.filter(r => r.trim()),
    };

    if (selectedTeam) {
      await supabase.from("teams").update(payload).eq("id", selectedTeam.id);
    } else {
      await supabase.from("teams").insert(payload);
    }

    setIsEditing(false);
    setSelectedTeam(null);
    setTeamForm({ name: "", slug: "", description: "", responsibilities: [""] });
    loadTeams();
  };

  const handleDeleteTeam = async (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      await supabase.from("teams").delete().eq("id", id);
      loadTeams();
    }
  };

  const handleSaveMember = async () => {
    if (!selectedTeam) return;

    const payload = {
      team_id: selectedTeam.id,
      name: memberForm.name,
      role: memberForm.role,
      photo_url: memberForm.photo_url || null,
      order_index: selectedMember?.order_index || (members[selectedTeam.id]?.length || 0),
    };

    if (selectedMember) {
      await supabase.from("team_members").update(payload).eq("id", selectedMember.id);
    } else {
      await supabase.from("team_members").insert(payload);
    }

    setIsMemberDialogOpen(false);
    setSelectedMember(null);
    setMemberForm({ name: "", role: "", photo_url: "" });
    loadTeams();
  };

  const handleDeleteMember = async (memberId: string, teamId: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      await supabase.from("team_members").delete().eq("id", memberId);
      loadTeams();
    }
  };

  const openTeamDialog = (team?: Team) => {
    if (team) {
      setSelectedTeam(team);
      setTeamForm({
        name: team.name,
        slug: team.slug,
        description: team.description,
        responsibilities: team.responsibilities.length > 0 ? team.responsibilities : [""],
      });
    } else {
      setSelectedTeam(null);
      setTeamForm({ name: "", slug: "", description: "", responsibilities: [""] });
    }
    setIsEditing(true);
  };

  const openMemberDialog = (team: Team, member?: TeamMember) => {
    setSelectedTeam(team);
    if (member) {
      setSelectedMember(member);
      setMemberForm({
        name: member.name,
        role: member.role,
        photo_url: member.photo_url || "",
      });
    } else {
      setSelectedMember(null);
      setMemberForm({ name: "", role: "", photo_url: "" });
    }
    setIsMemberDialogOpen(true);
  };

  const addResponsibility = () => {
    setTeamForm(prev => ({ ...prev, responsibilities: [...prev.responsibilities, ""] }));
  };

  const updateResponsibility = (index: number, value: string) => {
    setTeamForm(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.map((r, i) => i === index ? value : r),
    }));
  };

  const removeResponsibility = (index: number) => {
    setTeamForm(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Teams</h1>
          <p className="text-stone-600 mt-1">Manage church teams and their members.</p>
        </div>
        <Button onClick={() => openTeamDialog()} className="bg-stone-800 hover:bg-stone-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Team
        </Button>
      </div>

      <div className="grid gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                  <p className="text-sm text-stone-500 mt-1">/{team.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openTeamDialog(team)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTeam(team.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-stone-600 mb-4">{team.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-stone-900 mb-2">Responsibilities:</h4>
                <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                  {team.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-stone-900 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Members ({members[team.id]?.length || 0})
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openMemberDialog(team)}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Member
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {members[team.id]?.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 bg-stone-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-stone-900">{member.name}</p>
                        <p className="text-sm text-stone-500">{member.role}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openMemberDialog(team, member)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteMember(member.id, team.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedTeam ? "Edit Team" : "Add Team"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Team Name</Label>
              <Input
                value={teamForm.name}
                onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                placeholder="e.g., Church Council"
              />
            </div>
            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input
                value={teamForm.slug}
                onChange={(e) => setTeamForm({ ...teamForm, slug: e.target.value })}
                placeholder="e.g., council"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={teamForm.description}
                onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                placeholder="Team description..."
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Responsibilities</Label>
              {teamForm.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={resp}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    placeholder={`Responsibility ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeResponsibility(index)}
                    disabled={teamForm.responsibilities.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addResponsibility}>
                <Plus className="mr-1 h-3 w-3" />
                Add Responsibility
              </Button>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTeam} className="bg-stone-800 hover:bg-stone-700">
                Save Team
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Member Dialog */}
      <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMember ? "Edit Member" : "Add Member"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={memberForm.name}
                onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={memberForm.role}
                onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                placeholder="e.g., Chairman, Secretary"
              />
            </div>
            <div className="space-y-2">
              <Label>Photo URL (optional)</Label>
              <Input
                value={memberForm.photo_url}
                onChange={(e) => setMemberForm({ ...memberForm, photo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsMemberDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveMember} className="bg-stone-800 hover:bg-stone-700">
                Save Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
