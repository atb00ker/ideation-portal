CREATE TABLE "public"."reports" ("id" serial NOT NULL, "excel_link" text NULL, "site_visitors" bigint NOT NULL DEFAULT 0, PRIMARY KEY ("id"));COMMENT ON TABLE "public"."reports" IS E'Contains information required to create reports';
INSERT INTO "public"."reports"("id", "site_visitors") VALUES (0, 0);
