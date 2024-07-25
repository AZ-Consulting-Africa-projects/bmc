"use client"
import React, { useState } from 'react';
import { Badge, Button, Drawer } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { MessageCircleMore } from 'lucide-react';


const Chat = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <FloatButton
                shape="circle"
                type="primary"
                onClick={() => {
                    const url = `https://wa.me/${90214140}?text=${encodeURIComponent("")}`;
                    window.open(url, '_blank');
                    //showDrawer
                }}
                style={{ right: 94 }}
                className='flex items-center justify-center'
                icon={
                    <Badge size="small" count={0} showZero color="#faad14" >
                        <MessageCircleMore className=" text-white" />
                    </Badge>

                }
            />

            <Drawer title="Service client" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
}

export default Chat;