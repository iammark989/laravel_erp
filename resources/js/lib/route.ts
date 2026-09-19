import { route as ziggyRoute } from 'ziggy-js';
import { Ziggy } from '@/ziggy';

const route = (
    ...args: Parameters<typeof ziggyRoute>
) => {
    return ziggyRoute(...args, Ziggy as Parameters<typeof ziggyRoute>[3]);
};

export default route;