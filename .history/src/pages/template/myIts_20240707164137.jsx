function MyIts()
{
    const [value3, setValue3] = useState('Apple');
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
      };
  return <>
    <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
      <br />
      <br />
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  );
};
export default App;
收起

A

B

C

D
单选组合 - 配合 name 使用
可以为 Radio.Group 配置 name 参数，为组合内的 input 元素赋予相同的 name 属性，使浏览器把 Radio.Group 下的 Radio 真正看作是一组（例如可以通过方向键始终在同一组内更改选项）。

HangzhouShanghaiBeijingChengdu
HangzhouShanghaiBeijingChengdu
填底的按钮样式
实色填底的单选按钮样式。


Disabled

Disabled

不可用
Radio 不可用。


Option A

Option B

Option C

More...
Radio.Group 垂直
垂直的 Radio.Group，配合更多输入框选项。

HangzhouShanghaiBeijingChengdu
HangzhouShanghaiBeijingChengdu
HangzhouShanghaiBeijingChengdu
按钮样式
按钮样式的单选组合。

HangzhouShanghaiBeijingChengdu
HangzhouShanghaiBeijingChengdu
HangzhouShanghaiBeijingChengdu
大小
大中小三种组合，可以和表单输入框进行对应配合。



  
  </>
}
export default MyIts;