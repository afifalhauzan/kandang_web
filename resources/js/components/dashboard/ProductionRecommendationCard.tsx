import { useState } from "react";
import { IconChefHat, IconEdit, IconCheck } from "@tabler/icons-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const initialRecommendations = [
    { id: 1, name: "Es Teh Tarik Mbois", recommended: 150, current: 150, reason: "Cuaca panas, tren naik 15%" },
    { id: 2, name: "Es Teh Gula Aren", recommended: 80, current: 80, reason: "Penjualan stabil" },
    { id: 3, name: "Es Teh Lemon Sereh", recommended: 110, current: 110, reason: "Akhir pekan, promo aktif" },
    { id: 4, name: "Es Teh Susu Coklat", recommended: 70, current: 70, reason: "Penurunan tren ringan" },
    { id: 5, name: "Es Teh Jahe Merah", recommended: 40, current: 40, reason: "Cuaca cerah, demand rendah" },
];

export default function ProductionRecommendationCard() {
    const [recommendations, setRecommendations] = useState(initialRecommendations);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const handleEdit = (id: number, currentValue: number) => {
        setEditingId(id);
        setEditValue(currentValue.toString());
    };

    const handleSave = (id: number) => {
        const val = parseInt(editValue);
        if (!isNaN(val) && val >= 0) {
            setRecommendations(recommendations.map(r => r.id === id ? { ...r, current: val } : r));
        }
        setEditingId(null);
    };

    return (
        <Card className="overflow-hidden border-border/60 shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4 pt-4 flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                            <IconChefHat size={18} />
                        </div>
                        Rekomendasi Produksi Harian
                    </CardTitle>
                    <CardDescription>Target produksi hari ini berdasarkan prediksi AI.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="pl-6">Menu</TableHead>
                            <TableHead>Alasan AI</TableHead>
                            <TableHead className="text-center">Rekomendasi</TableHead>
                            <TableHead className="text-center">Target Final</TableHead>
                            <TableHead className="text-right pr-6">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recommendations.map((item) => (
                            <TableRow key={item.id} className="group hover:bg-muted/10">
                                <TableCell className="pl-6 font-semibold text-foreground/90">{item.name}</TableCell>
                                <TableCell>
                                    <span className="text-xs text-muted-foreground">{item.reason}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="outline" className="font-mono text-sm bg-blue-50/50 text-blue-700 border-blue-200">
                                        {item.recommended} cup
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    {editingId === item.id ? (
                                        <div className="flex items-center justify-center">
                                            <Input 
                                                type="number" 
                                                className="w-20 text-center h-8 font-mono" 
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                    ) : (
                                        <Badge 
                                            variant="secondary" 
                                            className={`font-mono text-sm ${item.current !== item.recommended ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}`}
                                        >
                                            {item.current} cup
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                    {editingId === item.id ? (
                                        <Button size="sm" variant="success" className="h-8 w-8 p-0" onClick={() => handleSave(item.id)}>
                                            <IconCheck size={16} />
                                        </Button>
                                    ) : (
                                        <Button size="sm" variant="outline" className="h-8 gap-1.5" onClick={() => handleEdit(item.id, item.current)}>
                                            <IconEdit size={14} />
                                            Override
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
