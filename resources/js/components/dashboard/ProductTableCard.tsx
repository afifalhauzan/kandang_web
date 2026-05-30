import { IconPlus } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const rows = [
    { 
        name: "Es Teh Tarik Mbois", 
        category: "Minuman", 
        sold: 420, 
        status: "Best Seller",
        image: "/es teh/es tarik.jpeg",
        price: "Rp 7.000",
        stock: 120
    },
    { 
        name: "Es Teh Gula Aren", 
        category: "Minuman", 
        sold: 290, 
        status: "Stabil",
        image: "/es teh/teh gula aren.jpeg",
        price: "Rp 8.000",
        stock: 45
    },
    { 
        name: "Es Teh Lemon Sereh", 
        category: "Minuman", 
        sold: 180, 
        status: "Naik",
        image: "/es teh/teh lemon.jpeg",
        price: "Rp 9.000",
        stock: 80
    },
    { 
        name: "Es Teh Susu Coklat", 
        category: "Minuman", 
        sold: 155, 
        status: "Stabil",
        image: "/es teh/teh susu.jpeg",
        price: "Rp 10.000",
        stock: 65
    },
    { 
        name: "Es Teh Jahe Merah", 
        category: "Minuman", 
        sold: 110, 
        status: "Stabil",
        image: "/es teh/teh jahe.jpeg",
        price: "Rp 10.000",
        stock: 90
    },
];

export default function ProductTableCard() {
    return (
        <Card className="overflow-hidden border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4 pt-4">
                <div className="space-y-1">
                    <CardTitle className="text-lg">Produk Operasional</CardTitle>
                    <CardDescription>Prioritas SKU dan katalog menu aktif Anda.</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                    <IconPlus className="h-4 w-4" />
                    Tambah Produk
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="w-[300px] pl-6">Info Produk</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead className="text-right">Stok</TableHead>
                            <TableHead className="text-right">Terjual</TableHead>
                            <TableHead className="pr-6">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} className="group hover:bg-muted/10">
                                <TableCell className="pl-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 rounded-lg border border-border/50 shadow-sm transition-transform group-hover:scale-105">
                                            <AvatarImage src={row.image} alt={row.name} className="object-cover" />
                                            <AvatarFallback className="rounded-lg">{row.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground/90">{row.name}</span>
                                            <span className="text-xs text-muted-foreground">SKU-{row.name.replace(/\s+/g, '').toUpperCase().substring(0, 5)}-001</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal">
                                        {row.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium text-foreground/80">{row.price}</TableCell>
                                <TableCell className="text-right">
                                    <span className={row.stock < 50 ? "text-amber-500 font-medium" : ""}>
                                        {row.stock}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right font-medium">{row.sold}</TableCell>
                                <TableCell className="pr-6">
                                    <Badge 
                                        variant={row.status === "Best Seller" ? "success" : row.status === "Naik" ? "default" : "outline"}
                                        className="shadow-sm"
                                    >
                                        {row.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
