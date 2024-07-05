


const items=[
    {
        key:1,
        url:"",
        title:"",
        time:""
    },    {
        key:2,
        url:"",
        title:"",
        time:""
    },    
    {
        key:3,
        url:"",
        title:"",
        time:""
    },
]
let myDom=items.map((item,)=>{
    return <>
    
    </>
})
function Recommendation()
{
    return <div className="p-10">
        <div className="first-title font-bold font-size-lg  ">
            文档模板
        </div>
        <div className="first-content">
            <div className="item-frame p-20 flex" style={{justifyContent:'space-between'}} >
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{width:'20%',height:'250px'}}>
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIDBQQGB//EADQQAQEAAQIDBAkCBQUAAAAAAAABAgMRBBITBSFSYjEyQlFhcZGh8BSBFSJBcsEjQ4LR8f/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAEQESAv/aAAwDAQACEQMRAD8A/YgKGUIqpIEmqIRJKpWKiaVhhURYlpUWAmpqqmqEVNNVE1NXU1RBVSRCIyUIbAAnYKAO/UqKuLqQABJKKgmlVEIiwl7JsVElYqwhGdTWtiLFGZLsTVEWFV1NVEWJaVNiiLC2UQiSVsWwED2AO8DJxdipKqauICMgKlVJAiMDKKmtKmxRKbFEIixFjWxKjMrFWFsogqtNioiwtl0gRYTTZOyidgvYA7QoDi6lSMrABGQhFYolE0lpoERkJE2JaJsVEJsabJEZ2FY0sTYDOwtmhbKMrCaWJsUSD2GwJ2CtgDs7FsonJsqSiFTYlY2BBVVxLZQgNgCbCUWy1Eg6QialdibAiSqisVEUlbFsIkrFUlVOxbKIQtgYB2Cqg5OqCXfzuT+egIRKKqkIUFuBFYdpARKIElYolRJVRAgqqktEpqyEQSqQJ2LZSaoAAg63PiXNiy3FyYdGtzxK5Ys9/kIIvmG+PiQWwLDOzzFy+YGlJny5eKfVN6gNQwueWI6mXhVG1Sz6vl+5dbHwg1TU9XEc4gpFz4lzAdTaLmXMBWladpbqQtxuNyAbgAHR2LY9hWWyuKadqbRCIFv5RGk5fFTZ85XVFawMeum6/lBrc8cfa/yjLXYZZM8v7lSvRdROWXL7LzW5Fc/MD09XTT1NP8rzVNqweq6mn8fqyz1sXnubO5EHpuuOrjll7vjd3lmZXJYj2454+Pv+yM9V45nytprY5etj/kitZq+LJOWvl7Imenl+bIy6eOXrIL/UZBj/AC+KkqPo7UWnuVrDZJtO1FoguRXNFqaIdzTcysTQO5lzs6iqN98U3Ux8LDKouWSwei6nlZ5amPhY8+RXVy+H0hBpdRGWpizy1Msv/Gdqo0ueKefysbfMW+XiVHotx/O9FzxYZZeZNpCt7kJ/dHnuQ5gr2YYY5etn9Judxx5vX/d4uf4jqZEK93Jj759Q8PPkCLXs1O2OJy9qYfKf9lodra+OtMtTPnw9Fnw98+LlXWxTdU5xLr6zQ4/h+I/l08+/0bXut+W/pbbvjOo7/ZnaOnrcNMNTL/Ux7r8Z/Ss75i5tdOotZziNPx4q5mWoLUVVqMs8cfWy2EK1GXMWXEaePx+SLxOn8VDqMqLxOPhReJ+SgqLBeI+SMuIEOpT105a6h5RFRdXLxF1lFUiuvj4WGpxmOPs735qjYrHhy4zU8X2i9Lj8f97Hu9+PpIPV+ekv+LPHiuH1MuXHPb3b7xtJ5p9QTv5QvbH3/YFI4/WHWc3rDrZNRl0uqMdfLHKZY5bWeiubNfIXXIO1O0tT2s62w7Ty8X32fPdbI+ucrX007S5vbv1Z8R2n08eb02+ibvnf1CMtbLL1stzkru/xnLmnNh3f12u9Vl2vp/H94+euoXOc4V9He0seXm5vsyy7Vy9nHb7uDNQdbI5K7n8Sy8X07kZdoeX7uN1h1VhXYnaOX5UfxHU9/wBnK6hdQiV0suN1Msubm+4nH6nj+ve5nUK6hB1MuO1Mv5eb6M7xLn9UuqsHRvEpuq8HVLqkHu6qprZeL7uf1S6pB0v1Op479Q53VBBrsQCBFuAoNyuQAFzDmAAtxuABWluABWgAC3AChbjcBAtxuABbnuABboy1sce/K937gAj9Vh7gAK//2Q==" alt="图片示例" style={{width:'80%',height:'100px'}} />
                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{width:'20%',height:'250px'}}>
                    <img src="data:image/jpeg;base64,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" alt="图片示例" style={{width:'80%',height:'100px'}} />
                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{width:'20%',height:'250px'}}>
                    <img src="data:image/jpeg;base64,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" alt="图片示例" style={{width:'80%',height:'100px'}} />
                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{width:'20%',height:'250px'}}>
                    <img src="data:image/jpeg;base64,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" alt="图片示例" style={{width:'80%',height:'100px'}} />
                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
            </div>

        </div>
    
    
    
    </div>
}
export default Recommendation