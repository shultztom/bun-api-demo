import {db} from '../db';

const nameRouter = (req: Request) => {
    if (req.method === "GET") return getAll()
    if (req.method === "POST") return create(req)
    if (req.method === "PUT") return update(req)
    if (req.method === "DELETE") return deleteItem(req)

    return new Response(`404!`);
}

const getAll = () => {
    const query = db.query(`SELECT * FROM name_table`);
    const values = query.all();

    const response = {data: values};

    return Response.json(response);
}

const create = async (req: Request) => {
    const body = await req.json();

    if (!body.name) {
        return Response.json(`Invalid body`, 400);
    }

    const query = db.query(`INSERT INTO name_table (name) VALUES ($name);`);
    const response = query.all({$name: body?.name});

    return Response.json({'rows updated': response})
}

const update = async (req: Request) => {
    const body = await req.json();

    if (!body.name) {
        return Response.json(`Invalid body`, 400);
    }

    const idArr = req.url.split('/');
    const id = idArr[idArr.length - 1];

    if (!id) {
        return Response.json(`Invalid url`, 400);
    }

    const lookupQuery = db.query(`SELECT * FROM name_table WHERE id = $id`);
    const value = lookupQuery.get({$id: id});

    if (value === null) {
        return Response.json(`Unable to find item by id ${id}`, 404);
    }

    const updateQuery = db.query(`UPDATE name_table SET name = $name WHERE id = $id;`)
    const response = updateQuery.all({$name: body?.name, $id: id});

    return Response.json({'rows updated': response})
}

const deleteItem = (req: Request) => {
    const idArr = req.url.split('/');
    const id = idArr[idArr.length - 1];

    if (!id) {
        return Response.json(`Invalid url`, 400);
    }

    const updateQuery = db.query(`DELETE FROM name_table WHERE id = $id;`)
    const response = updateQuery.all({$id: id});

    return Response.json({'rows updated': response})
}


export {
    nameRouter
}