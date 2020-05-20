import * as express from 'express';

import { AtomicAssetsNamespace } from '../index';
import { WebServer } from '../../../server';
import { filterQueryArgs } from '../../utils';
import { getLogs } from '../utils';
import logger from '../../../../utils/winston';

export function schemasEndpoints(core: AtomicAssetsNamespace, web: WebServer, router: express.Router): void {
    router.get('/v1/schemas', (async (req, res) => {
        res.json({success: true});
    }));

    router.get('/v1/schemas/:collection_name', (async (req, res) => {
        res.json({success: true});
    }));

    router.get('/v1/schemas/:collection_name/:schema_name', (async (req, res) => {
        res.json({success: true});
    }));

    router.get('/v1/schemas/:collection_name/:schema_name/logs', (async (req, res) => {
        const args = filterQueryArgs(req, {
            page: {type: 'int', min: 1, default: 1},
            limit: {type: 'int', min: 1, max: 100, default: 100}
        });

        try {
            res.json({
                success: true,
                data: await getLogs(
                    core.connection.database, core.args.contract, 'schema',
                    req.params.collection_name + ':' + req.params.schema_name,
                    (args.page - 1) * args.limit, args.limit
                )
            });
        } catch (e) {
            logger.error(e);

            res.json({'success': false});
        }
    }));
}
