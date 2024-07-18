import { useState, useEffect } from 'react';
import { Input, Button, Menu, Card, Modal, List, Tooltip, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;

const DocumentSearchPage = () => {
    const [categories, setCategories] = useState({ '学科分类': [], '专业分类': [] });
    const [articles, setArticles] = useState([]);
    const [displayedArticles, setDisplayedArticles] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('全部');
    const [selectedSubCategory, setSelectedSubCategory] = useState('全部');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ name: '', context: '' });
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
                // const response = await axios.get('http://localhost:8080/doc/getCategories');
                // const professionCategories = response.data.professions;
                // const subjectCategories = response.data.subjects;
                // setCategories({
                //     '学科分类': professionCategories,
                //     '专业分类': subjectCategories
                // });
          
        };

        const fetchArticles = async () => {
                // const response = await axios.get('http://localhost:8080/doc/getArticles');
                // setArticles(response.data);
                // setDisplayedArticles(response.data);
           
        };

        fetchCategories();
        fetchArticles();
    }, []);

    const handleMainCategoryClick = (e) => {
        setSelectedMainCategory(e.key);
        setSelectedSubCategory('全部');
        setDisplayedArticles([]);
    };

    const handleSubCategoryClick = (e) => {
        setSelectedSubCategory(e.key);
        setDisplayedArticles([]);
    };

    const showModal = (article) => {
        setModalContent(article);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/doc/search?keyword=${searchKeyword}`);
            setArticles(response.data);
            setDisplayedArticles(response.data);
            setSelectedMainCategory('全部');
            setSelectedSubCategory('全部');
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const filteredArticles = articles.filter(article =>
        (selectedSubCategory === '全部' || article[selectedMainCategory === '学科分类' ? 'profession' : 'subject'] === selectedSubCategory)
    );

    const mainMenuItems = [
        { key: '全部', label: '全部' },
        { key: '学科分类', label: '学科分类' },
        { key: '专业分类', label: '专业分类' }
    ];

    const subMenuItems = selectedMainCategory !== '全部' ? [
        { key: '全部', label: '全部' },
        ...categories[selectedMainCategory].map(subCategory => ({ key: subCategory, label: subCategory }))
    ] : [];

    return (
        <div style={{ padding: '20px' }}>
            <h1>文献搜索</h1>
            <Input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="请输入"
                prefix={<SearchOutlined />}
                style={{ marginBottom: '20px', width: '400px' }}
            />
            <Button type="primary" onClick={handleSearch}>搜索</Button>
            <div style={{ marginTop: '20px' }}>
                <Menu mode="horizontal" selectedKeys={[selectedMainCategory]} items={mainMenuItems} onClick={handleMainCategoryClick} />
                {selectedMainCategory !== '全部' && (
                    <Menu mode="horizontal" selectedKeys={[selectedSubCategory]} items={subMenuItems} onClick={handleSubCategoryClick} style={{ marginTop: '10px' }} />
                )}
            </div>
            <div style={{ marginTop: '20px' }}>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={displayedArticles.length > 0 ? displayedArticles : [{ name: '无文献', documentKey: '', context: '' }]}
                    renderItem={article => (
                        <List.Item>
                            {article.name === '无文献' ? (
                                <Card>
                                    <p>无文献</p>
                                </Card>
                            ) : (
                                <Tooltip title={article.context.slice(0, 100) + '...'}>
                                    <Card
                                        hoverable
                                        className="document-card"
                                        onClick={() => showModal(article)}
                                    >
                                        <div className="document-card-content">
                                            <div className="document-card-title">
                                                <span className="document-card-category">{article.profession} - {article.subject}</span>
                                                {article.name}
                                            </div>
                                            <p>{article.documentKey}</p>
                                        </div>
                                    </Card>
                                </Tooltip>
                            )}
                        </List.Item>
                    )}
                />
            </div>
            <Modal
                title={modalContent.name}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="apply" type="primary" onClick={handleOk}>
                        应用
                    </Button>
                ]}
                width={800} // Adjust width if needed
            >
                <div className="custom-scroll" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <p>{modalContent.context}</p>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <h3>相关文章推荐:</h3>
                    <div style={{ display: 'flex', overflowX: 'auto' }}>
                        {articles.slice(0, 4).map((relatedArticle, index) => (
                            <Tooltip key={index} title={relatedArticle.context.slice(0, 100) + '...'}>
                                <Card
                                    style={{ width: '200px', margin: '10px' }}
                                    onClick={() => showModal(relatedArticle)}
                                >
                                    <Meta title={relatedArticle.name} description={relatedArticle.documentKey} />
                                </Card>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DocumentSearchPage;
