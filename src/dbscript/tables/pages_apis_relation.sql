create table pages_apis_relation(
    pages_id INTEGER NOT NULL,
    pages_type_id INTEGER NOT NULL,
    apis_id INTEGER NOT NULL,
    active TINYINT(1) DEFAULT 0,
    INDEX pagerealation_page_id (pages_id), 
    INDEX pagerealation_page_type_id (pages_type_id), 
    INDEX pagerealation_api_id (apis_id),    
    PRIMARY KEY (pages_id, pages_type_id, apis_id)
)