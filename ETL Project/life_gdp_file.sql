CREATE TABLE "gdp_table" (
	"id" serial   NOT NULL,
    "Country_Name" VARCHAR(100)   NOT NULL,
    "Country_Code" VARCHAR(100)   NOT NULL,
    "2008" VARCHAR(100)   NOT NULL,
    "2009" VARCHAR(100)   NOT NULL,
    "2010" VARCHAR(100)   NOT NULL,
    "2011" VARCHAR(100)   NOT NULL,
    CONSTRAINT "pk_gdp_table" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "life_table" (
	"id" serial   NOT NULL,
    "Country_Name" VARCHAR(100)   NOT NULL,
    "Country_Code" VARCHAR(100)   NOT NULL,
    "2008" VARCHAR(100)   NOT NULL,
    "2009" VARCHAR(100)   NOT NULL,
    "2010" VARCHAR(100)   NOT NULL,
	"2011" VARCHAR(100)   NOT NULL,
    CONSTRAINT "pk_life_table" PRIMARY KEY (
        "id"
     )
);

DROP TABLE "life_table";

CREATE TABLE "merged_table" (
    "id" serial   NOT NULL,
    "Country_Name" VARCHAR(100)   NOT NULL,
    "Country_Code" VARCHAR(100)   NOT NULL,
    "2008_GDP_Dollars" VARCHAR(100)   NOT NULL,
    "2009_GDP_Dollars" VARCHAR(100)   NOT NULL,
    "2010_GDP_Dollars" VARCHAR(100)   NOT NULL,
    "2011_GDP_Dollars" VARCHAR(100)   NOT NULL,
    "2008_Life_Exp_Yrs" VARCHAR(100)   NOT NULL,
    "2009_Life_Exp_Yrs" VARCHAR(100)   NOT NULL,
    "2010_Life_Exp_Yrs" VARCHAR(100)   NOT NULL,
    "2011_Life_Exp_Yrs" VARCHAR(100)   NOT NULL,
    CONSTRAINT "pk_merged_table" PRIMARY KEY (
        "id"
     )
);

SELECT * FROM gdp_table;

SELECT * FROM life_table;

SELECT * FROM merged_table;



