import React, { useContext, useRef } from 'react'
import Input from '../conponents/Input';
import { ArrowUpRight, Loader } from 'lucide-react';
import { Button, Container } from '../conponents/index'
import { Context } from '../context/Context';

function Home() {
    const {
        input,
        recentPromot,
        prevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
        setPrevPrompts,
        setRecentPromt,
        setInput,
    } = useContext(Context);

    // const inputRef = useRef(null);

    const handleClick = () => {
        onSent();
    }

    return (
        <Container className='max-w-6xl'>
            <div className='flex justify-center flex-col items-center'>
                <div>
                    <div>
                        <div className='flex'>
                            <div className='text-xl mr-2'>{recentPromot}</div>
                            <Loader size={20} />
                        </div>
                        {
                            showResult ?
                                <div className=''>{resultData}</div>
                                :
                                <div>
                                    <div>
                                        <h2>Welcome to the chat bot</h2>
                                    </div>
                                    <div>
                                        <div>homt</div>
                                        <div>text</div>
                                        <div>about</div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className='flex justify-center items-center bottom-0 static'>
                    <Input
                        type="text"
                        placeholder="'How can i help you today?' "
                        className=""
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    // ref={inputRef}
                    />
                    <Button onClick={handleClick}>{<ArrowUpRight strokeWidth={1.25} />}</Button>
                </div>
            </div>
        </Container>
    )
}
export default Home
