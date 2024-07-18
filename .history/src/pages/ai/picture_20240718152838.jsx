import React, { useState } from 'react';
import { Button, Spin, Card } from 'antd';

const Picture = () => {
    const [loading, setLoading] = useState(false);
    const [showCard, setShowCard] = useState(false);

    const handleGenerateClick = () => {
        setLoading(true);

        // Simulate loading process
        setTimeout(() => {
            setLoading(false);
            setShowCard(true);
        }, 1000);
    };

    return (
        <div>
            <Button onClick={handleGenerateClick}>
                生成思维导图
            </Button>

            {loading && <Spin size="large" />}

            {showCard && (
                <Card title="生成的思维导图" style={{ width: 300, marginTop: 16 }}>
                    <div id="picture">
                        {/* Content of the picture */}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Picture;
