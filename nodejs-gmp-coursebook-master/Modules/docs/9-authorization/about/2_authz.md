---
sidebar_position: 1
---

# What is authorization

## Definition
Authorization is the process of verification tha authenticated user or device has access to the specific resource or functionality.

Developers use some kind of authorization middlewares for allowing or blocking user actions. The middleware usually knows which actions to allow or to block based on who the user is and what resource he is trying to access. 

## Authorization strategies
### Role-based access control (RBAC)
In this strategy, every user is assigned one or more predetermined roles, and each role comes with a specified set of permissions. 

Let's discuss online shop as example. To make our shop secure we need to guard access to sensitive data such as products, user personal data etc. To do this we will create few roles such as customer, admin, manager.
Now we can create middleware to guard our data and, for example, allow access to modify products only for managers and admins.

```js
app.post(`/products`, (req, res) => {
    const user = req.currentUser;
    
    if (user.role !== Roles.ADMIN || user.role !== Roles.MANAGER) {
        res.status(401).send("User don't have permissions to create products");
    }
    // Logic
    ...
});
```

Usually, business rules to access data is much complicated that just role, sometimes we need to accept some additional rules like user city, country, day of the week or owner of the resource. To resolve this cases was developed our next strategy.

### Attribute-based access control (ABAC)
To cope with unsolvable problems within RBAC, was developed another solution based on attributes. This strategy uses attributes of the resource and user instead of user role to allow or decline access to the resource.

Let's discuss our online shop again. For example, user can create order in the shop, this will add owner attribute to the order entity. In case if someone decided to delete this order by id, we can create function to check that attribute owner of the order is equal to attribute id of the user.

```js
app.delete(`/order/:orderId`, async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    
    const user = req.currentUser;

    if (order.owner !== user.id) {
        res.status(401).send("User don't have permissions to delete order");
    }
    // Logic
    ...
});
```

### Access-control list (ACL)
In this strategy we use list of rules that allow or deny access to the resource. 

Using our example with the shop, we can create groups named `product_manager` and `customer` that has different scope of permissions to the resources. Now we can assign user to relevant groups and then based on list of permissions allow or deny access to the resource: 
```js
const isAccessAllowed = (resourceName, method, permissions = []) => {
    return permissions.some(perm => {
        return perm.resource = resourceName 
            && perm.methods.contains(method)
            && perm.access == 'allow';
     });
}

app.post(`/products`, async (req, res) => {
    const user = req.currentUser;
    const isAllowed = isAccessAllowed('/products/*', 'POST', req.currentUser.perms);

    if (!isAllowed) {
        res.status(401).send("User don't have permissions to create product");
    }
    // Logic
    ...
});
```


    
