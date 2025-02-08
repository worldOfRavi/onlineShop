import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import UserOrderDetailsView from "./order-details";

const UserOrders = () => {
  const [openOrderDetails ,setOpenOrderDetails] = useState(false)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>{" "}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1234</TableCell>
              <TableCell>Feb 2025</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$123</TableCell>
              <TableCell>
              <Dialog open={openOrderDetails} onOpenChange={setOpenOrderDetails}>
                <Button onClick = {()=>setOpenOrderDetails(true)}>View Details</Button>
                <UserOrderDetailsView />
              </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserOrders;
