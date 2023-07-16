import React from 'react';
import {ErrorBoundary} from 'fogito-core-ui';
import Skeleton from 'antd/lib/skeleton';

export const SkletonLoader = React.memo(() => {
    return (
        <ErrorBoundary>
            <div className='d-flex flex-wrap'>
                {Array.from(new Array(7)).map((row, key) => {
                    return (
                        <div key={key} className='mr-1 mt-2'>
                            <Skeleton.Button
                                active
                                size={'default'}
                                shape={'square'}
                                className={`d-block`}
                                style={{height: 84, width: 84}}
                            />
                        </div>
                    )
                })}
            </div>
        </ErrorBoundary>
    );
});
